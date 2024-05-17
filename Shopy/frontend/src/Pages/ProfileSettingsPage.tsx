import { Container, Divider, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import AddressForm from "../components/forms/AddressForm";
import PhoneNumberForm from "../components/forms/PhoneNumberForm";

//create a ProfileSettingsPage component where I only want to have a reset password form
function ProfileSettingsPage() {
    return (
        <>
            <Navbar />
            <Container maxW='60%' py={8} >
                <Heading as='h1'> Profile settings </Heading>
                <Divider />
                <Heading as='h2' size='md' mt={8} mb={4}> Address </Heading>
                <AddressForm />

                <Heading as='h2' size='md' mt={18} mb={4}> Contact </Heading>
                <PhoneNumberForm />
            </Container>
        </>
    );
}

export default ProfileSettingsPage;