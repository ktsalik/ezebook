import axios from 'axios';

const Page = {
  apiUrl: 'https://pagesmanagement.azurewebsites.net/api/',
  getPages() {
    return new Promise(resolve => {
      axios.get(`${this.apiUrl}ResponsivePages`).then(response => {
        resolve(response.data); 
      });
    });
  },
};

export default Page;