module.exports = function(user) {

  /*************************
   * REST
   *************************/
  user.remoteMethod(
    'getMyOrders',
    {
      http: {path: "/:id/myorders", verb: 'get'},
      description: "Queries full list of orders of a user. (helper)",
      accepts: {arg: 'id', type: 'string', required: true},
      returns: {type: 'object', root: true}
    }
  );


  /*************************
   * Callbacks
   *************************/
  user.getMyOrders = function(pUserId, pCb) {

    // find user
    user.findById(
      pUserId,
      {
        include: {
          relation: 'orders',
          scope: {
            include: {
              relation: 'product'
            }
          }
        }
      },
      function (err, pUser) {
        if(err){
          pCb(null, err);
        }
        // remove first level
        //var result = JSON.parse(JSON.stringify(pUser));
        //result = (result != null)? result.orders : [];

        pCb(null, pUser);

      }
    );
  }
};
