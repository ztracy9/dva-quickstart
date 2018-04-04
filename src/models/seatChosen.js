import dva from 'dva';

export default {
  namespace: 'seatChosen',
  state: {
    list:[]
  },
  reducers: {
    'chosen'(state, { payload: seatloc }) {
      let len = state.list.length;
      //如果此座位已经在选中列表中，则将其移除（相当于点击取消选中）
       var newlist = state.list.filter(
          function(item){
            return !(item.row==seatloc.row&&item.col==seatloc.col);
          }
        );
      state.list = newlist;
      if(len==newlist.length)
        state.list.push(seatloc);
      return state;
    },
  },
};
