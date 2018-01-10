(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('editRule', EditRule);

    EditRule.$inject = ['RuleFactory', 'DwinAdapter', '$compile', '$rootScope', '$templateCache', '$document', '$timeout'];

    function EditRule (RuleFactory, DwinAdapter, $compile, $rootScope, $templateCache, $document, $timeout) {

        var PRECONDITION_FAILED = 412;

        return {
            restrict: 'A',
            link: EditRuleLink,
            controller: EditRuleController,
            scope: {
                rule: '=',
                createFormVisible: '=',
                editForm: '=',
                commissionShareMinimumValue: '=',
                commissionShareMaximumValue: '=',
                isShareWithinRange: '='
            }
        };

        /**
         * @param $scope
         * @param $element
         * @param $attrs
         * @param ctrl
         * @constructor
         */
        function EditRuleLink ($scope, $element, $attrs, ctrl) {

            $scope.rule.publisherPartnerDisplay = $scope.rule.publisherName + ' (' + $scope.rule.publisherId + ')';

            // When the create form is open hide all edit buttons
            $scope.$watch(function () {
                return $scope.createFormVisible;
            }, toggleEditButtons);

            $scope.$on('removeEditForm', closeEditForm);

            $scope.$on('showConcurrencyWarning', showConcurrencyWarning);

            // Set up click events on the edit buttons
            $element.find('.edit-button').on('click', function () {

                // Clone the rule to prevent changing the actual table row (object is passed by reference)
                var ruleCopy = RuleFactory.copy($scope.rule);

                // Had to do this because of the structure of the ng-models on the form
                $scope.sPController = {
                    ruleModel: ruleCopy,
                    commissionShareMinimumValue: $scope.commissionShareMinimumValue,
                    commissionShareMaximumValue: $scope.commissionShareMaximumValue,
                    isShareWithinRange: $scope.isShareWithinRange
                };

                hideEditButtons();
                hideDeleteButtons();
                appendEditForm($scope.rule);
            });

            /**
             * If the create form is shown then we hide all the edit buttons.
             * If the create form is not shown then we show all the edit buttons.
             *
             * @param createFormShown boolean
             */
            function toggleEditButtons (createFormShown) {

                if (createFormShown === true) {
                    hideEditButtons();
                    hideDeleteButtons();
                    removeEditForm();
                } else {
                    showEditButtons();
                    showDeleteButtons();
                }
            }

            /**
             * Shows all edit buttons.
             */
            function showEditButtons () {
                $element.parent().find('.edit-button').css('visibility', 'visible');
            }

            /**
             * Hides all edit buttons.
             */
            function hideEditButtons () {
                $element.parent().find('.edit-button').css('visibility', 'hidden');
            }

            /**
             * Shows all delete buttons
             */
            function showDeleteButtons () {
                $element.parent().find('.delete-button').css('visibility', 'visible');
            }

            /**
             * Hides all delete buttons
             */
            function hideDeleteButtons () {
                $element.parent().find('.delete-button').css('visibility', 'hidden');
            }

            /**
             * Appends an edit form under the row of the clicked edit button in the directory.
             * The rule will be passed in and the form will be populated.
             */
            function appendEditForm () {

                var template = $compile($templateCache.get('edit-rule-container'))($scope);
                template.on('click', '.close-rule-form', closeEditForm);

                template.on('click', '#save-rule', function () {
                    ctrl.saveRule($scope.sPController.ruleModel);
                });

                $element.after(template);

                $scope.$digest();

                var row = angular.element($document[0].querySelector('#edit-form'));

                row.find('.select2-angular').remove();
                row.find('#publisher-partners-label').text(DwinAdapter.translate('commission-sharing.selectPartnerPublisherSingle'));
                row.find('#selected-partners').removeClass('hidden');

                // Delay to allow the template to load for smoother slide transition
                $timeout(function () {
                    row.slideDown(500);
                }, 50);
            }

            /**
             * Responsible for:
             * - Sliding up then removing the edit container
             * - Calling function to show edit / delete button
             */
            function removeEditForm () {

                var editForm = $element.parent().find('#edit-form');

                editForm.slideUp(500, function () {
                    $element.parent().find('.edit-rule-container').remove();
                });
            }

            /**
             * Shows a modal window warning the user the rule has already been
             * updated by someone else and they need to refresh the directory.
             * If they click confirm it will refresh the directory.
             * If they click cancel it will just close the modal.
             */
            function showConcurrencyWarning () {

                DwinAdapter.showConfirm(
                    DwinAdapter.translate('commission-sharing.optimisticConcurrencyWarning'),
                    DwinAdapter.translate('commission-sharing.optimisticConcurrencyWarningTitle'),
                    function (result) {
                        if (result) {
                            $rootScope.$broadcast('refreshList');
                        }
                    }
                );
            }

            /**
             * Facade function that contains all the calls necessary to close an edit form.
             */
            function closeEditForm () {
                removeEditForm();
                showEditButtons();
                showDeleteButtons();
            }
        }

        /**
         * @param $scope
         * @param $element
         * @param $attrs
         * @constructor
         */
        function EditRuleController ($scope) {

            var vm = this;

            vm.saveRule = saveRule;

            function saveRule (rule) {
                rule.route = 'rules';
                rule.put().then(
                    saveRuleSuccess,
                    saveRuleError
                );
            }

            function saveRuleSuccess () {
                $scope.$emit('removeEditForm');
                $rootScope.$broadcast('refreshList');
            }

            function saveRuleError (err) {
                if (err.status === PRECONDITION_FAILED) {
                    $scope.$emit('showConcurrencyWarning');
                } else {
                    DwinAdapter.showError(
                        DwinAdapter.translate("js.commission-sharing.uploadSaveFailure"),
                        DwinAdapter.translate("js.general.error")
                    );
                }
            }
        }
    }
})();