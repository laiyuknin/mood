import { useMemo, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import { localImage } from '../../assets';
import { daysName } from '../../constants';
import { IDaysMood } from '../../interfaces';
import { getProgressImage } from '../../utils';
import { requestData } from './hooks';
import './index.scss'

const Mood = () => {
  const [day, setDay] = useState<IDaysMood[]>(requestData);

  const nowaday = (new Date()).getDay()

  const onClickItem = (index: number, checked?: boolean) => {
    const newDay = day;
    newDay[index].checked = !checked;
    setDay([...newDay]);
  }

  const getAverage = useMemo(() => {
    return (day.reduce((a, b) => a + (b?.mood ?? 0), 0) / day.length).toFixed(2);
  }, [day])

  return (
    <View className='mood'>
      <View className='top'>
        <View className='h1'>
          <Image src={localImage.headPortrait} />
          <Text>李强</Text>
        </View>
        <View className='h2'>{getAverage}</View>
        <View className='h3'>周平均心情指数</View>
      </View>
      <View className='bottom'>
        {day.map((item, index) => {
          return (
            <View className={`bottom-item ${item.checked ? 'bottom-item-checked' : ''} ${getProgressImage(item.mood)}`} key={item.day} onClick={() => onClickItem(index, item.checked)}>
              <View className='bottom-item-top'>
                <View className='bottom-item-progress' style={{ height: `${item.mood ?? 30}%` }}>
                  <Text className='bottom-item-progress-text'>{item.mood}</Text>
                  <Image className='bottom-item-progress-image' src={localImage[getProgressImage(item.mood)]} />
                </View>
              </View>
              <Text className={`bottom-item-text ${nowaday === item.key ? 'bottom-item-textBg' : ''}`}>{daysName[item.key]}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Mood