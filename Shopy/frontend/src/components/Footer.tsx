import { Box, BoxProps, Container } from "@chakra-ui/react"

export const Footer = (props: BoxProps) => {
    return (
        <Box as="footer" role="contentinfo" bg="bg.accent.default" {...props}>
            <Container>
                <h1>Footer</h1>
            </Container>
        </Box>
    )

}