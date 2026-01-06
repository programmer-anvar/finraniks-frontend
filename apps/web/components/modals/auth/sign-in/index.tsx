import { Button } from "@finranks/design-system/components/Button"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@finranks/design-system/components/modal"
import { Typography } from "@finranks/design-system/components/typography"
import { Lock, Mail, X } from "lucide-react";
import { FastField, type FieldProps, Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import { Input } from "@finranks/design-system/components/field/input";
import PasswordInput from "@finranks/design-system/components/field/password-input";
import Link from "next/link";
import { useAppContext } from "@/lib/providers/customs/app";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@finranks/design-system/components/sonner";
import GoogleSignInButton from "@/components/google-signin-button";
import { useModals } from "@/stores/modal";
import { signInSchema } from "@/model/auth/sign-in";
import unifiedAuth from "@/services/base/unified-auth";


type TSignInForm = {
    email: string,
    password: string
}


const SignInModal = () => {
    const { setState } = useAppContext();
    const { signIn, setModal } = useModals();
    const searchParams = useSearchParams();


    const redirectUrl = searchParams.get('redirect') || '/profile/dashboard';


    useEffect(() => {
        const authState = unifiedAuth.getAuthState();
        if (authState.isAuthenticated) {
            setState(prev => ({
                ...prev,
                access_token: authState?.accessToken as string,
                profileData: authState?.profileData as any,
            }));
        }
    }, []);


    const handleSubmit = async (
        values: TSignInForm,
        { setSubmitting }: { setSubmitting: (value: boolean) => void }
    ) => {
        setSubmitting(true);
        let responseData = null;
        try {
            const response = await fetch(
                '/en/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                }
            );
            responseData = await response.json();

            if (response.ok && responseData.success && responseData.data) {
                const data = responseData.data;

                if (unifiedAuth.setAuthData(data, true)) {
                    console.log('[SIGNIN-CLIENT] Authentication data set');

                    setState(prev => ({
                        ...prev,
                        profileData: data,
                        access_token: data.access_token,
                    }));

                    setModal({ signIn: false })

                    console.log('[SIGNIN-CLIENT] Redirecting to:', redirectUrl);
                    window.location.href = redirectUrl;
                } else {
                    console.error('[SIGNIN-CLIENT] Failed to set auth data');
                    toast.error('Failed to complete login. Please try again.');
                }
            } else {
                const errorMessage = responseData?.message || responseData?.error || 'Login failed';
                toast.error(errorMessage);
            }
        } catch (error: any) {
            console.error('[SIGNIN-CLIENT] Login failed:', error);
            toast.error(error?.message || 'Something went wrong!');
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = useMemo<TSignInForm>(() => {
        return {
            email: "",
            password: ""
        };
    }, []);


    return (
        <Modal open={signIn} onOpenChange={() => setModal({ signIn: false })}>
            <ModalContent classNames={{
                closeButton: "hidden"
            }}>
                <ModalHeader >
                    <ModalTitle className="flex items-center justify-between">
                        <div className="mt-2">
                            <span className="text-white">Sign in</span>
                            <Typography variant="small" color="helper">Please, fill out the fields below to sign in</Typography>
                        </div>
                        <Button onClick={() => setModal({ signIn: false })} hasIconOnly iconDescription="Close" variant="outline"><X /></Button>
                    </ModalTitle>
                </ModalHeader>

                <div>
                    <Formik<TSignInForm>
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={signInSchema}
                    >
                        {({ isValid, dirty, submitForm, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="space-y-4 p-4">
                                        <div className="flex flex-col gap-2">
                                            <FastField name="email">
                                                {({ field, meta, form }: FieldProps) => (
                                                    <Input
                                                        placeholder="Enter your email address"
                                                        {...field}
                                                        size="lg"
                                                        label="Email"
                                                        prepend={<Mail />}
                                                        isClearable={!form.isSubmitting}
                                                        disabled={form.isSubmitting}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();

                                                                if (isValid && dirty && !form.isSubmitting) {
                                                                    submitForm();
                                                                }
                                                            }
                                                        }}
                                                        maxLength={128}
                                                        isInvalid={meta.touched && !!meta.error}
                                                        errorMessage={meta.touched ? meta.error : ""}
                                                    />
                                                )}
                                            </FastField>
                                            <FastField name="password">
                                                {({ field, meta }: FieldProps) => (
                                                    <div className="relative">
                                                        <PasswordInput
                                                            inputProps={{
                                                                placeholder: "Password",
                                                                label: "Password",
                                                                ...field,
                                                                maxLength: 128,
                                                                isInvalid: meta.touched && !!meta.error,
                                                                errorMessage: meta.touched ? meta.error : "",
                                                                prepend: <Lock />,
                                                                size: "lg"
                                                            }}
                                                        />
                                                        <button className="text-blue-500 absolute right-0 top-0 cursor-pointer text-sm" onClick={() => setModal({ forgotPassword: true, signIn: false })}>Forgot Password</button>
                                                    </div>
                                                )}
                                            </FastField>

                                            <Button className="mt-5" isDisabled={!isValid || isSubmitting} isLoading={isSubmitting} type="submit">Get Started</Button>

                                            <Typography variant="small" color="primary">Do you have not an account? <Link href="#" className="underline text-blue-500! font-semibold" onClick={() => setModal({ register: true, signIn: false })}>Sign Up</Link></Typography>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    <div className="px-4 pb-4">
                        <div className="modal-form__or">or</div>
                        <GoogleSignInButton />
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default SignInModal