import CategoryCard from "../components/CategoryCard"
import { Flex } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { Welcome } from "../components/Welcome"

const Home = () => {
    const handleCardClick = () => {
        console.log('Card clicked!');
      };

    return (
        <>
            <Navbar />
            <Welcome />
            <Flex justify="center" align="center" mt="8">
            <CategoryCard
                imageUrl="https://static.vecteezy.com/system/resources/thumbnails/008/532/596/small/kiwi-fruit-cutout-file-png.png"
                title="Category 1"
                description="Short description goes here."
                onClick={handleCardClick}
                margin={2}
            />
            <CategoryCard
                imageUrl="https://i.pinimg.com/originals/7d/20/1f/7d201f08f054d30ba3dbb5348ca13492.png"
                title="Category 2"
                description="Short description goes here."
                onClick={handleCardClick}
                margin={2}
            />
            <CategoryCard
                imageUrl="https://static.vecteezy.com/system/resources/thumbnails/008/532/596/small/kiwi-fruit-cutout-file-png.png"
                title="Category 3"
                description="Short description goes here."
                onClick={handleCardClick}
                margin={2}
            />
            </Flex>
        </>
  )
}

export default Home
