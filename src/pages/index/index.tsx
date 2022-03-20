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
  const [selectDay, setSelectDay] = useState<number>(NaN);

  const nowadays = (new Date()).getDay()

  const onClickItem = (key: number) => {
    let newKey = key;
    if (key === selectDay) {
      newKey = NaN
    }
    setSelectDay(newKey);
  }

  const getAverage = useMemo(() => {
    return (day.reduce((a, b) => a + (b?.mood ?? 0), 0) / day.length).toFixed(2);
  }, [day])

  return (
    <View className='mood'>
      <View className='card'>
        <View className='top'>
          <View className='h1'>
            <Image className='h1-image' src={localImage.headPortrait} />
            <Text>李强</Text>
          </View>
          <View className='h2'>{getAverage}</View>
          <View className='h3'>周平均心情指数</View>
        </View>
        <View className='bottom'>
          {day.map((item, index) => {
            return (
              <View className={`bottom-item ${item.key === selectDay ? 'bottom-item-checked' : ''} ${getProgressImage(item.mood)}`} key={item.day}>
                <View className='bottom-item-top'>
                  <View className='bottom-item-progress-height' style={{ animation: `height${item.mood ?? 30} 2s both ${(index + 1) * 0.1}s` }}>
                    <View className='bottom-item-progress' onClick={() => onClickItem(item.key)}>
                      <Text className='bottom-item-progress-text'>{item.mood}</Text>
                      <Image className='bottom-item-progress-image' src={localImage[getProgressImage(item.mood)]} />
                    </View>
                  </View>
                </View>
                <Text className={`bottom-item-text ${nowadays === item.key ? 'bottom-item-textBg' : ''}`}>{daysName[item.key]}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default Mood
