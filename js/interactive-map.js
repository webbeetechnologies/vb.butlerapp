/* Script for popover positioning */
function interactivemapInit(states, selector) {
    var items;
    var dataStates = states || [];
    selector = selector || '.map-state .land';
    horizontalOffset = 10;
    verticalOffset = 5;
  
    items = document.querySelectorAll(selector);
    items = Array.prototype.slice.call(items);

    var $popoverContent = $('.popover-content');
    items.forEach(function(item) {
        var stateCode = item.dataset.statecode;
        var stateObj = dataStates.find(item => item.code == stateCode);

        item.addEventListener("mouseover", function(e) {
            $popoverContent.find('.title').html(stateObj.name);
            $popoverContent.find('.customer-number').html(stateObj.customerNumber);
            $popoverContent.find('.customer-label').html(stateObj.customerLabel);
            $popoverContent.addClass("active");
        });

        item.addEventListener("mouseout", function(e) {
            $popoverContent.removeClass("active");
        });

        item.addEventListener('mousemove', function(e) {
            var rightSpace = document.body.clientWidth - e.pageX;
            
            if( rightSpace > 300 ) {
                var newRule = {  'right':'auto', 'left': (horizontalOffset + e.pageX) + 'px', 'top': (e.pageY + verticalOffset) + 'px' };
            }else{
                console.log(horizontalOffset + $popoverContent.width())
                var newRule = {  'right':'auto', 'left': (e.pageX - $popoverContent.width() - (horizontalOffset*4)) + 'px', 'top': (e.pageY + verticalOffset) + 'px' };
            }
    
            $popoverContent.css(newRule);
        });
    });
}
/*
var $ = jQuery;
$(document).ready(function() {
    interactivemapInit(states, '.map-state .land');
});
*/