let users = {};

let user = window.localStorage;

let yh = JSON.parse(user.getItem('yh') || '{}');

users.aou = function (p) {
    if (yh.shopcar[p.id]) {
        yh.shopcar[p.id] += p.num;
    } else {
        yh.shopcar[p.id] = p.num;
    }
    this.save(yh);
}

// user.gettc = function (a) {
//     let sum = 0;
//     sum += yh.shopcar[a];
//     return sum;
// }

users.getusers = function () {
    return JSON.parse(user.getItem('yh') || '{}');
}

users.save = function (yh) {
    user.setItem('yh', JSON.stringify(yh));
}

export default users;