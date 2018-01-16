/**
 * [treeMenu 树形数据]
 *@example
 *  new treeMenu(数据).init(开始id)
 */
function treeMenu(a) {
  this.tree = a || [];
  this.groups = {};
};
treeMenu.prototype = {
  init: function (parentid) {
    this.group();
    return this.getDom(this.groups[parentid]);
  },
  group: function () {
    for (var i = 0; i < this.tree.length; i++) {
      if (this.groups[this.tree[i].parentid]) {
        this.groups[this.tree[i].parentid].push(this.tree[i]);
      } else {
        this.groups[this.tree[i].parentid] = [];
        this.groups[this.tree[i].parentid].push(this.tree[i]);
      }
    }
  },
  getDom: function (a) {
    if (!a) { return '' }
    var data = '[';
    for (let i = 0; i < a.length; i++) {
      data += `{"title":"${a[i].departmentname}","key":"${a[i].departmentid}&${a[i].parentid}"`;
      data += this.getDom(this.groups[a[i].departmentid]) ? ',' : '';
      data += this.getDom(this.groups[a[i].departmentid]) ? '"children":' + this.getDom(this.groups[a[i].departmentid]) : '';
      if (i === a.length - 1) {
        data += '}';
      } else {
        data += '},';
      }
    };
    data += ']';
    return data;
  }
};
