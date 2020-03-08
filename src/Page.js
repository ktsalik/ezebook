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
  },
  update(pageId, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.apiUrl}ResponsivePages/${pageId}`, data).then(response => {
        resolve(response.data);
      }).catch(() => {
        reject();
      });
    });
  },
  getPage(pageId) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.apiUrl}ResponsivePages/${pageId}`).then(response => {
        resolve(response.data); 
      }).catch(() => {
        reject();
      });
    });
  },
};

export default Page;