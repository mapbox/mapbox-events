// Shims for .bind() and .toISOString in IE 8

module.exports = function() {
  if ( !Date.prototype.toISOString ) {         
      (function() {         
          function pad(number) {
              var r = String(number);
              if ( r.length === 1 ) {
                  r = '0' + r;
              }
              return r;
          }      
          Date.prototype.toISOString = function() {
              return this.getUTCFullYear()
                  + '-' + pad( this.getUTCMonth() + 1 )
                  + '-' + pad( this.getUTCDate() )
                  + 'T' + pad( this.getUTCHours() )
                  + ':' + pad( this.getUTCMinutes() )
                  + ':' + pad( this.getUTCSeconds() )
                  + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                  + 'Z';
          };       
      }() );
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                                   ? this
                                   : oThis,
                                 aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
}