
export class Pinterest {

  constructor(appId) {
    this.PDK = PDK;
    this.PDK.init({
      appId,
      cookie: true
    });
  }

  login() {
    PDK.login({ scope: 'read_public, write_public' }, (response) => {
      console.log(response);
    })
  }

  getBoardPins(boardId) {
    return new Promise((resolve, reject) => {
      PDK.request(`/boards/${boardId}/pins/`, (response) => {
        if (!response || response.error) {
          reject(response.error);
        }
        resolve(response.data);
      });
    });
  }

}