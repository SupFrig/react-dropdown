import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  padding: 10px 0px;
  display: flex;
  width: 250px;
  flex-direction: row;
`

const ImageWrapper = styled.div`
  width: 25%;
  order: 0;
`

const Image = styled.img`
  display: block;
  width: 100%;
`

const Content = styled.div`
  order: 1;
  width: 75%;
  padding: 0px 8px;
`

const Title = styled.strong`
  color: #00a6f0;
  font-size: 17px;
  line-height: 20px;
  display: block;
`

const Subtitle = styled.p`
  color: #111111;
  font-size: 13px;
  line-height: 20px;
`

const Raised = styled.span`
  color: #bdbdbd;
  font-size: 12px;
  height: 17px;
  display: block;
  font-weight: 500;
  position: relative;
  line-height: 19px;
`

const EggContainer = styled.div`
  width: 14px;
  height: 17px;
  display: block;
  float: left;
  margin: 0px 10px 0px 0px;
  position: relative;
  background: url(img/egg-empty.png) no-repeat top left;

  ${props =>
    props.percent >= 100 &&
    css`
      background: url(img/egg-full.svg) no-repeat top left;
    `}
  background-size: 100%;
`

const EggBackground = styled.span`
  position: absolute;
  display: block;
  bottom: 3px;
  left: 2px;
  width: 10px;
  height: 12px;
  overflow: hidden;
  ${props =>
    props.percent < 100
      ? css`
          height: ${(props.percent * 12) / 100}px;
        `
      : css`
          display: none;
        `}
`

const EggProgress = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0px;
`

const UluleItem = props => {
  const data = props.data
  const title = data[`name_${data.lang}`]
  const subtitle = data[`subtitle_${data.lang}`]
  const [percent, setPercent] = useState(parseInt((data.amount_raised / data.goal) * 100))

  //troncature des textes pour éviter les disparités d'affichage
  const truncateText = (str = '', length = 15) => (str.length > length ? str.substring(0, length - 3) + '...' : str)

  return (
    <Container>
      <ImageWrapper>
        <Image src={data.image} />
      </ImageWrapper>
      <Content>
        <Title title={title}>{truncateText(title, 20)}</Title>
        <Subtitle title={subtitle}>{truncateText(subtitle, 50)}</Subtitle>
        <Raised>
          <EggContainer percent={percent}>
            <EggBackground percent={percent}>
              <EggProgress src="./img/egg-bg.png" />
            </EggBackground>
          </EggContainer>
          {data.amount_raised}
          {data.currency_display}
        </Raised>
      </Content>
    </Container>
  )
}

export default UluleItem
