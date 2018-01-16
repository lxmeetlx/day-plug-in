/**
 * [betree 转树形嵌套数据]
 * @type {Object}
 * @property  {array} tree [预处理源数据]
 * @property  {array} option [源数据中子项键名]
 * @property  {boolean} withpid [处理结果id项是否为与父节点拼接项（分隔符为&）]
 * @property  {function} init [初始处理数据函数]
 * **@param  {json} sourcedata [传入预处理源数据 必传]
 * **@param  {string} pid [传入开始节点id 必传]
 * **@param  {array} option [传入源数据中子项键名 选传]
 * **@param  {boolean} withpid [传入处理结果id项是否为与父节点拼接项 选传]
 * @property  {function} group [将源数据处理为递归嵌套数据格式]
 * @property  {function} getDom [递归拼接树形结构数据字符串]
 * @return {json}   [正常返回递归json数组，调用错误返回空字符串]
 * @example <caption调用示例</caption>
 *
 * // returns {json}
 * totree.init(sourcedata,0);
 * // returns {json}
 * totree.init(sourcedata,0,['pid1','id1','name1'],true);
 */
const betree = {
  tree : [],
  groups : {},
  option : ['pid','id','name'],
  withpid : false,
  beforeinit : function (){
    this.tree = [];
    this.groups = {};
    this.withpid = false;
  },
  init: function (sourcedata,pid,option,withpid) {
    this.beforeinit();
    this.tree = sourcedata || [];
    this.option = option || this.option;
    this.withpid = withpid || false;
    this.group();
    let dealdata = [];
    try {
       dealdata = JSON.parse(this.getDom(this.groups[pid]));
    } catch (e) {
       dealdata = this.getDom(this.groups[pid]);
    }
    return dealdata;
  },
  group: function () {
    for (let i = 0; i < this.tree.length; i++) {
      if (this.groups[this.tree[i][this.option[0]]]) {
        this.groups[this.tree[i][this.option[0]]].push(this.tree[i]);
      } else {
        this.groups[this.tree[i][this.option[0]]] = [];
        this.groups[this.tree[i][this.option[0]]].push(this.tree[i]);
      }
    }
  },
  getDom: function (a) {
    if (!a) { return '' }
    let data = '[';
    for (let i = 0; i < a.length; i++) {
      data += '{"label":"' + a[i][[this.option[2]]] + '","id":"' +  (this.withpid?(a[i][this.option[1]] + '&' + a[i][this.option[0]]):a[i][this.option[1]]) +'"';
      data += this.getDom(this.groups[a[i][this.option[1]]]) ? ',' : '';
      data += this.getDom(this.groups[a[i][this.option[1]]]) ? '"children":' + this.getDom(this.groups[a[i][this.option[1]]]) : '';
      if (i === a.length - 1) {
        data += '}';
      } else {
        data += '},';
      }
    };
    data += ']';
    return data;
  }
}

module.exports = betree;
