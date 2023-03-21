import { Col, Container, Row, Text } from '@sui/core';
import DescPNG from '../../public/desc.png';
import UtilsPNG from '../../public/utils.png';
import Image from 'next/image';
const features = [
  [
    '智能',
    '提示',
    '组件最多应用的场景',
    'ShitUI 团队里都是多年丰富经验的开发者，对组件使用率最高，疑问最多的信息内置在每个组件的注释上，无需查看文档便可敏捷开发',
    DescPNG,
    0,
    '#fa709a',
    '#f18271',
  ],
  [
    '令人惊艳',
    '的样式',
    '在你初次尝试过后',
    'ShitUI 的每一个组件都是参考了多个文档和市面上流行的大多数组件库，我们很了解，长什么样的组件构建出的应用程序，能让人惊讶不已。',
    DescPNG,
    1,
    '#7b5fac',
    '#cc6b8e',
  ],
  [
    '动态',
    '主题',
    '轻而易举',
    '每个组件都根据主题的变更做响应式变化，你可以轻松从根部定制你们项目自己的 UI 样式风格，这多亏了令人惊叹的高性能 CSS 样式方案 Emotion',
    DescPNG,
    0,
    '#3f51b1',
    '#a86aa4',
  ],
  [
    '明暗',
    '模式',
    '在毫秒之间',
    'Shit UI 的所有组件都内置了明暗模式响应，您只需几行代码就可以将其应用于您的应用程序',
    DescPNG,
    1,
    '#f3a469',
    '#3f51b1',
  ],
  [
    '更少的',
    '代码',
    '做更多的事',
    '同样的，对组件开发体验的精心打磨是我们始终如一坚持的初衷，合理的结构，深思熟虑的 APIs，一切为了开发者',
    DescPNG,
    0,
    '#cc6b8e',
    '#f18271',
  ],
  [
    '实用',
    '属性',
    '节省你的时间',
    'Shit UI 提供了一套开箱即用的缩写 CSS 属性、通过将多个 CSS 属性组合在一起或简化棘手的语法来加快工作流程。',
    UtilsPNG,
    1,
    '#5a55ae',
    '#f7c978',
  ],
];
const Features = () => {
  return features.map((v: any[]) => {
    const gt = `linear-gradient(to right, ${v[6]} 0%, ${v[7]} 100%)`;
    const desc = (
      <Col
        alignSelf='start'
        leftText={!v[5]}
        rightText={!!v[5]}
        css={{
          maxWidth: '25em',
        }}>
        <Text h2 size='5rem'>
          <Text span gradient={gt}>
            {v[0]}
          </Text>
          {v[1]}
        </Text>
        <Text size='2rem' py='.5rem'>
          {v[2]}
        </Text>
        <Text color='#566171'>{v[3]}</Text>
      </Col>
    );
    return (
      <Container section px='8em' my='10em'>
        <Row justify='center'>
          {!v[5] && desc}

          <Col
            css={{
              margin: `0px ${!!v[5] ? '8em' : '0px'} 0px ${!v[5] ? '8em' : '0px'}`,
            }}>
            <Image width={500} height={300} src={v[4]} alt={''} />
          </Col>
          {!!v[5] && desc}
        </Row>
      </Container>
    );
  });
};
