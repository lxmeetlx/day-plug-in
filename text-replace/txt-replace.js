
/**
 * [pxToRem remToPx html文本px与rem互换]
 * @param  {string} _s [待处理文本]
 * @return {string}    [处理好数据]
 */
function pxToRem(_s){
  //匹配:20px或: 20px不区分大小写
  var reg = /(:|: )+(\d)+(px)/gi;
  let newStr= _s.replace(reg, function(_x){
      _x = _x.replace(/(:|: )/,'').replace(/px/i,'');
      return ':' + parseFloat(_x) / 50 + 'rem';
  });
  return newStr;
}
function remToPx(_s){
  //匹配:0.24rem或: 0.24rem不区分大小写
  var reg = /(:|: )+(:?(:?\d+\.\d+)|(:?\d+))+(rem)/gi;
  let newStr= _s.replace(reg, function(_x){
      _x = _x.replace(/(:|: )/,'').replace(/rem/i,'');
      return ':' + parseInt(parseFloat(_x) * 50,10) + 'px';
  });
  return newStr;
}
