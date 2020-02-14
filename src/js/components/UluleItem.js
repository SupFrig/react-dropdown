import React, { useEffect } from "react";
import styled, { css } from 'styled-components';

const Container = styled.div`
padding: 10px 0px;
display: flex;
width: 250px;
flex-direction: row;
`;

const ImageWrapper = styled.div`
width: 25%;
order: 0;
`;

const Image = styled.img`
display: block;
width: 100%;
`;

const Content = styled.div`
order: 1;
width: 75%;
padding: 0px 8px;
`;

const Title = styled.strong`
color: #00A6F0;
font-size: 17px;
line-height: 20px;
display: block;
`;

const Subtitle = styled.p`
color: #111111;
font-size: 13px;
line-height: 20px;
`;

const Raised = styled.span`
color: #BDBDBD;
font-size: 12px;
font-weight: 500;
`;

const UluleItem = (props) => {
    const data = props.data;
    const title = data[`name_${data.lang}`];
    const subtitle = data[`subtitle_${data.lang}`];
    console.log(data);
    //troncature des textes pour éviter les disparités d'affichage
    const truncateText = (str = "", length = 15) => str.length > length ? str.substring(0, length - 3) + "..." : str;

    const getGoalPercent = () => {
        console.log("montant obtenu",data.amount_raised);
        console.log("objectif",data.goal);
        console.log(parseInt(data.amount_raised / data.goal * 100));
        return parseInt(data.amount_raised / data.goal * 100);
    };
    getGoalPercent();
    return (
        <Container>
            <ImageWrapper>
                <Image src={data.image}/>
            </ImageWrapper>
            <Content>
                <Title title={title}>{truncateText(title,20)}</Title>
                <Subtitle title={subtitle}>{truncateText(subtitle,50)}</Subtitle>
                <Raised>{data.amount_raised}{data.currency_display}</Raised>
            </Content>
        </Container>
    );
};

export default UluleItem;