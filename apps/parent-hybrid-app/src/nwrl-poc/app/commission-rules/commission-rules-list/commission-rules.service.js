export default class commissionRulesService {
  constructor($http) {
    this.$http = $http
  }

  getcommissionRules() {
    let data = this.$http.get('http://localhost:3004/data');
    console.log('test', data);
    return data;
  }

}
