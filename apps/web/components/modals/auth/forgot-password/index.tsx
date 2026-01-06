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
import axios from "axios";
import config from "@/lib/config";
import { get } from "lodash";
import { forgotPasswordSchema } from "@/model/auth/forgot-password";


type TForgotPasswordForm = {
    email: string,
}


const ForgotPassword = () => {
    const { setState, state } = useAppContext();
    const { forgotPassword, setModal } = useModals();
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
        values: TForgotPasswordForm,
        { setSubmitting }: { setSubmitting: (value: boolean) => void }
    ) => {
        setSubmitting(true);
        axios.post(`${config.APP_URL}/auth/password-reset`, {
            email: values.email,
        }, {
            headers: {
                Authorization: `Bearer ${state.anonymous_access_token}`,
            }
        })
            .then(() => {
                setState(prev => {
                    return {
                        ...prev,
                        forgotPasswordEnteredEmail: values.email,
                    }
                })
                setModal({ forgotPassword: false, verifyModal: true })
                setSubmitting(false)
            })
            .catch(error => {
                const message = get(error, 'response.data.message', 'Something went wrong!');
                toast.error(message)
                setSubmitting(false)
            })
    };

    const initialValues = useMemo<TForgotPasswordForm>(() => {
        return {
            email: "",
        };
    }, []);


    return (
        <Modal open={forgotPassword} onOpenChange={() => setModal({ forgotPassword: false })}>
            <ModalContent classNames={{
                closeButton: "hidden"
            }}>
                <ModalHeader >
                    <ModalTitle className="flex items-center justify-between">
                        <div className="mt-2">
                            <span className="text-white">Forgot Password</span>
                            <Typography variant="small" color="helper">Don't worry! It happens. Please enter the email associated with your.</Typography>
                        </div>
                        <Button type="button" onClick={() => setModal({ forgotPassword: false })} hasIconOnly iconDescription="Close" variant="outline"><X /></Button>
                    </ModalTitle>
                </ModalHeader>

                <div>
                    <Formik<TForgotPasswordForm>
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={forgotPasswordSchema}
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
                                            <Button className="mt-5" isDisabled={!isValid || isSubmitting} isLoading={isSubmitting} type="submit">Send Code</Button>
                                            <Typography variant="small" color="primary" align="center">Remember password? <Link href="#" className="underline text-blue-500! font-semibold" onClick={() => setModal({ signIn: true, forgotPassword: false })}>Sign In</Link></Typography>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default ForgotPassword