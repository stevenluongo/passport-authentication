// export default function makeOrdersDb({Orders}) {
//     async function findOne(_filter, _options = {}) {
//       const {populate, sort} = _options;
//       const query = Orders.findOne(_filter);
//       if (sort) query.sort(sort);
//       _.forEach(populate || [], (p) => query.populate(p));
//       return query.lean().exec();
//     }
//     async function insert({id: _id = uuid(), ...orderInfo}) {
//       return Orders.create({_id, ...orderInfo});
//     }
//     async function update(_filter, _orderInfo) {
//       return Orders.findOneAndUpdate(_filter, _orderInfo, {new: true});
//     }
//     async function remove(_id) {
//       const res = await Orders.deleteOne({_id});
//       return {
//         found: res.n,
//         deleted: res.deletedCount
//       };
//     }
//     async function find(_filter, _options = {}) {
//       const {populate} = _options;
//       const query = Orders.find(_filter);
//       if (populate) _.forEach(populate || [], (p) => query.populate(p));
//       return query.lean().exec();
//     }
//     async function aggregate(pipeline = []) {
//       return Orders.aggregate(pipeline);
//     }
//     async function paginate(_query, _options) {
//       const {sort, populate, page, limit} = _options;
//       return Orders.paginate(_query, {
//         sort,
//         lean: true,
//         page,
//         limit,
//         populate
//       });
//     }
//     return Object.freeze({
//       findOne,
//       insert,
//       update,
//       remove,
//       find,
//       aggregate,
//       paginate
//     });
//   }