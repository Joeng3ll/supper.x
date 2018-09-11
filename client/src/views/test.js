const newSourceData = sourceData.map((item, index) => {
  const children = item.children.map((itemChild, childIndex) => ({
    ...itemChild,
    layer_1_index: index,
    layou_2_index: childIndex
  }));
  return {
    ...item,
    children
  };
});
const singleColumnArr = R.pluck("children", newSourceData);
const allArr = singleColumnArr.reduce(
  (prev, item) => prev.concat(item),
  []
);
const newArr = allArr.reduce((acc, current) => {
  // debugger
  const seriesIndex = R.findIndex(R.propEq("id", current.id))(acc);
  const data = sourceData.map(item => {
    const seriesInSource = R.find(R.propEq("id",current.id))(item.children)
    return seriesInSource ? seriesInSource['stockCount'] : 0
  });
  if (seriesIndex > -1) {
    const primeData = acc[seriesIndex]["data"];
    const newItem = {
      ...acc[seriesIndex],
      data
      // data: [...primeData, current.stockCount]
    };
    acc.splice(seriesIndex, 1, newItem);
  } else {
    acc.push({
      ...current,
      data
    });
  }
  return acc;
}, []);
console.log(newArr, JSON.stringify(sourceData));



const seriesArr = singleColumnArr.reduce((acc, current) => {
  // debugger
  const seriesIndex = R.findIndex(R.propEq("id", current.id))(acc);
  if (seriesIndex <= -1) {
    const data = sourceData.map(item => {
      const seriesInSource = R.find(R.propEq("id", current.id))(
        item.children
      );
      return seriesInSource ? seriesInSource["stockCount"] : 0;
    });
    const seriesItem = R.pick(['id','key','name','stockCount'],current)
    acc.push({
      ...seriesItem,
      type: 'bar',
      data
    });
  }
  return acc;
}, []);
console.log(seriesArr, JSON.stringify(sourceData));
