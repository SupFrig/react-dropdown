import React from 'react'
import ReactDOM from 'react-dom'

import Dropdown from './components/Dropdown.js'
import styled, { createGlobalStyle } from 'styled-components'

const Background = styled.div`
  background: #eee;
`

const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
  color: #7a7a7a;
  font-family: Roboto;
  background: #fff;
  padding: 1rem 2rem;
  min-height: 200vh;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 900;
  line-height: 28px;
  padding-bottom: 2rem;
`

const Subtitle = styled.h3`
  padding: 2rem 0rem;
`

const options = [
  { text: 'NoMeansNo', value: 'nomeansno' },
  { text: 'Boredoms', value: 'boredoms' },
  { text: 'Mr. Bungle', value: 'mr-bungle' },
  { text: 'Boris', value: 'boris' },
  { text: 'Cardiacs', value: 'cardiacs', selected: true },
  { text: 'Death Grips', value: 'death-grips' },
  { text: 'Pissed Jeans', value: 'pissed-jeans' },
]

const optionsMultiple = [
  { text: 'NoMeansNo', value: 'nomeansno' },
  { text: 'Boredoms', value: 'boredoms', selected: true },
  { text: 'Mr. Bungle', value: 'mr-bungle' },
  { text: 'Boris', value: 'boris' },
  { text: 'Cardiacs', value: 'cardiacs' },
  { text: 'Death Grips', value: 'death-grips', selected: true },
  { text: 'Pissed Jeans', value: 'pissed-jeans' },
]

const optionsVeryLong = [
  { text: 'NoMeansNo', value: 'nomeansno' },
  { text: 'Boredoms', value: 'boredoms', selected: true },
  { text: 'Mr. Bungle', value: 'mr-bungle' },
  { text: 'Boris', value: 'boris' },
  { text: 'Cardiacs', value: 'cardiacs' },
  { text: 'Death Grips', value: 'death-grips', selected: true },
  { text: 'Pissed Jeans', value: 'pissed-jeans' },
  { text: 'Melt Banana', value: 'melt-banana' },
  { text: 'Oceansize', value: 'oceansize' },
  { text: 'Igorrr', value: 'igorrr' },
  { text: 'Aphex Twin', value: 'aphex-twin' },
  { text: 'Lightning Bolt', value: 'lightning-bolt' },
  { text: 'Chai', value: 'chai' },
  { text: 'Descendents', value: 'descendents' },
  { text: 'The Frights', value: 'the-frights' },
  { text: 'Misfits', value: 'misfits' },
  { text: 'Wire', value: 'wire' },
]

const urlParams = {
  q: 'sort:popular',
  extra_fields: 'main_image,owner,partnerships',
  lang: 'fr',
}

const App = props => {
  return (
    <Background>
      <Container>
        <Title>Dropdown Component</Title>
        <Subtitle>Simple</Subtitle>
        <Dropdown options={options} />
        <Subtitle>Multiple with title</Subtitle>
        <Dropdown title="Mes groupes préférés" options={optionsMultiple} multiple={true} />
        <Subtitle>Multiple with search</Subtitle>
        <Dropdown options={optionsMultiple} multiple={true} search={true} />
        <Subtitle>Multiple with search, select & clear buttons, display offset</Subtitle>
        <Dropdown
          options={optionsVeryLong}
          multiple={true}
          search={true}
          clearButton={true}
          selectAllButton={true}
          offset={4}
        />
        <Subtitle>API Endpoint</Subtitle>
        <Dropdown
          url="https://api.ulule.com/v1/search/projects"
          urlParams={urlParams}
          multiple={true}
          search={true}
          clearButton={true}
          selectAllButton={true}
          offset={4}
        />
      </Container>
    </Background>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
