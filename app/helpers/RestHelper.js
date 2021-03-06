var $ = require('jquery');

class RestHelperClass {
  get (url) {
    return new Promise(function(success,error) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: success,
        error: error
      })
    })
  }
  post (url, data) {
    return new Promise(function(success,error) {
      $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: success,
        error: error
      })
    })
  }
  patch (url, data) {
    return new Promise(function(success,error) {
      $.ajax({
        url: url,
        data: data,
        type: 'PATCH',
        success: success,
        error: error
      })
    })
  }
  del (url) {
    return new Promise(function(success,error) {
      $.ajax({
        url: url,
        type: 'DELETE',
        success: success,
        error: error
      })
    })
  }
}

const RestHelper = new RestHelperClass();

module.exports = RestHelper;
