import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  width: 100%; /* Adjusts the width to fill the container */
  font-family: 'Roboto', sans-serif;
  min-height: 100px; /* Minimum height for the card, adjust as needed */
`;

const MealStyle = styled.p`
  margin: 5px 0;
  margin-bottom: 20px
`;

const Block = styled.p`
  margin-bottom: 20px
`;

const ResturantDescriptionStyle = styled.p`
  text-align: center;
  font-weight: bold;
`;

const TitleStyle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
`;

const ImageStyle = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const Image = ({ link, image, name }) => {
  return (
    <TitleStyle>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <ImageContainer>
          <ImageStyle src={image} alt={name} />
        </ImageContainer>
      </a>
    </TitleStyle>
  );
}

export const RestaurantDescription = ({ text }) => {
  return (
    <ResturantDescriptionStyle>
      {text}
    </ResturantDescriptionStyle>
  );
};

export const Meal = ({ name, text }) => {
  return (
    <MealStyle>
      {name &&
        <strong>{name}<br /></strong>
      }
      {text}
    </MealStyle>
  );
};

export const MultipleOfSameMealType = ({ name, texts }) => {
  return (
    <Block>
      <strong>{name}</strong>
      {texts && texts.length > 0 &&
        texts.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
    </Block>
  );
};

export const MultipleMeals = ({ description, listOfMeals }) => {
  return (
    <div>
      {listOfMeals && listOfMeals.length > 0 && (
        <Block>
          <RestaurantDescription text={description} />
          {listOfMeals.map((item) => (
            <Meal
              key={item.name}
              name={item.name}
              text={item.description}
            />
          ))}
        </Block>
      )}
    </div>
  );
};