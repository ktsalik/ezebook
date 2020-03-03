import axios from 'axios';

const Page = {
  apiPath: 'http://pagesmanagement.azurewebsites.net/api/',
  getPages() {
    return new Promise(resolve => {
      axios.get(`${this.apiPath}ResponsivePages`).then(response => {
        resolve(response.data); 
      });
    });
  },
};

export default Page;