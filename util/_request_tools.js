const cnodeApi = 'https://cnodejs.org/api/v1';
export function httpGet(params,callback) {
    fetch(cnodeApi+'/topic/'+id)
    .then(res => {
      if(res.status === 200){
        res.json().then(data => {
          console.log(data)
          this.setState(
              {details: data.data,
              replies: data.data.replies,
              loading: false
            }
          )
        })
      }
    })
    .catch( err=> {
      console.warn(err)
    })
}