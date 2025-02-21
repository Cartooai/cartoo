import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabaseClient from '../services/supabaseClient';
import { Container, Field, Input, Button, Alert } from '@chakra-ui/react';
import { Theme } from '@chakra-ui/react';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        status: '',
        message: ''
    });
    const navigate = useNavigate();
    // const location = useLocation();


    // Redirect if user is already logged in
    useEffect(() => {
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate('/dashboard', { replace: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email) {
            setAlertInfo({
                show: true,
                status: 'error',
                message: 'Please enter your email address'
            });
            return;
        }

        try {
            setIsLoading(true);

            setAlertInfo({
                show: true,
                status: 'info',
                message: 'Sending magic link to your email...'
            });

            const { error } = await supabaseClient.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: window.location.origin + '/dashboard',
                }
            });

            if (error) throw error;

            setAlertInfo({
                show: true,
                status: 'success',
                message: 'Check your email for the magic link!'
            });

            setEmail('');
        } catch (error) {
            setAlertInfo({
                show: true,
                status: 'error',
                message: error.message || 'An error occurred during login'
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Theme appearance="light">
            <Container fluid className="flex flex-col items-center justify-center h-[80vh] bg-[#E6F48C]">
                <div className='mt-20'>
                    <h1 className="text-5xl font-bold mb-10">Hello,</h1>
                    <p className='text-2xl sm:text-3xl font-semibold mb-3'>I am <strong>Cartoo</strong>, your shopping Buddy</p>
                    <p className='text-2xl sm:text-3xl font-semibold mb-3'>Login to see my top picks for you</p>

                    {alertInfo.show && (
                        <Alert.Root status={alertInfo.status} className="mb-4">
                            <Alert.Indicator />
                            <Alert.Title>{alertInfo.message}</Alert.Title>
                        </Alert.Root>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Field.Root>
                            <Input
                                type="email"
                                placeholder="Email"
                                className='p-8'
                                borderBottomWidth={"2px"}
                                borderBottomColor={'black'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </Field.Root>
                        <div className='flex flex-col items-center'>
                            <Button
                                type="submit"
                                className="text-2xl font-semibold bg-white p-7 mt-5 hover:bg-[#E6F48C] w-full"
                                isLoading={isLoading}
                                loadingText="Sending..."
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </Theme>
    );
}

export default LoginPage;