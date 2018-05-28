import Sprite from '../interfaces/sprite'

const screenWidth = sharedCanvas.width / wx.getSystemInfoSync().pixelRatio
const screenHeight = sharedCanvas.height / wx.getSystemInfoSync().pixelRatio


let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/score/${index}.png`,
    width: (screenWidth * .04),
    height: 42 / 27 * (screenWidth * .04)
  })
})

let rankNumberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/score/${index}.png`,
    width: (screenWidth * .03),
    height: 42 / 27 * (screenWidth * .03)
  })
})

let rankIcon = [...Array(4)].map((el, index) => {
  let iconName = ''
  switch (index) {
    case 0: 
      iconName = 'th'
      break
    case 1:
      iconName = '1st'
      break
    case 2: 
      iconName = '2nd'
      break
    default: 
      iconName = '3rd'
  }
  return new Sprite({
    imgSrc: `images/rank/${iconName}.png`,
    width: (screenWidth * .06),
    height: (screenHeight * .06)
  })
})


export default function (ctx) {
  let drawData = []

  const canvasWidth = sharedCanvas.width
  const canvasHeight = sharedCanvas.height
  wx.getFriendCloudStorage({
    keyList: ['all'],
    success(res) {
      console.log(res)

      res.data.forEach(el => {
        if (el.KVDataList.find(e => e.key === 'all')) {
          el.data = JSON.parse(el.KVDataList.find(e => e.key === 'all').value)
          drawData.push(el)
        }
      })
      console.log(drawData)

      ctx.clearRect(0, 0, canvasWidth, -canvasHeight)

      drawData.sort((a, b) => a.data.score < b.data.score)
      drawData.forEach((el, index) => {
        ctx.font = `${screenWidth * .1}px Arial`
        ctx.fillText(el.nickname, 
                     canvasWidth * .35, 
                     -canvasHeight * .655 + (index * canvasHeight * .081));
        
        rankNumberList[index + 1].x = screenWidth * .28
        rankNumberList[index + 1].y = -screenHeight * .685 + (index * screenHeight * .081)
        rankNumberList[index + 1].draw(ctx)

        ;`${el.data.score}`.split('').forEach((_num, _index) => {
          numberList[_num].x = screenWidth * .69 + _index * 16
          numberList[_num].y = -screenHeight * .685 + (index * screenHeight * .081)
          numberList[_num].draw(ctx)
        })
      })
    }
  })
}