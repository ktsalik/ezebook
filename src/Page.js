import axios from 'axios';

const Page = {
  apiUrl: 'https://pagesmanagement.azurewebsites.net/api/',
  getPages() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}ResponsivePages`).then(response => {
        resolve(response.data); 
      }).catch(() => {
        reject();
      });
    });
  },
  create(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.apiUrl}ResponsivePages`, data).then(response => {
        resolve(response.data);
      }).catch(() => {
        reject();
      });
    });
  }
};

export default Page;