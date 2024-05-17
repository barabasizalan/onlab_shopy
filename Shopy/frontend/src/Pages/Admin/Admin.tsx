import { Heading, Text } from "@chakra-ui/react";

const Admin: React.FC = () => {
    return (
        <>
            <Heading as="h1" size="lg" mt={5}>Admin page</Heading>
            <Text mt={5}>Dear <b>admin,</b> <br /> this page is still under developement.<br />Please check back soon.</Text>
        </>
    );
};

export default Admin;