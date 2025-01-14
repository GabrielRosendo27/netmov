/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "../form/Input";
import { OrangeButton } from "../buttons/OrangeButton";
import { useNavigate } from "react-router-dom";
import { RegisterFormInputs } from "../validations/registerSchema";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useRegisterUser } from "./hooks/useRegisterUser";

export function Register() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/login");
  }

  const { mutate, isPending, isError, error } = useRegisterUser();
  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Usuário registrado com sucesso:", response.message);
        navigate("/login");
      },
      onError: (err) => {
        console.log("Erro ao registrar usuário", err.message);
      },
    });
  };
  const { register, handleSubmit, errors } = useRegisterForm(onSubmit);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-darkBlue w-screen h-screen flex items-center justify-center flex-col">
        <div className="flex flex-col gap-1">
          <Input text="Nome de usuário:" {...register("user")} type="text" />
          {errors.user && <span className="text-red-600">{errors.user.message}</span>}
          <Input text="Email:" {...register("email")} type="text" />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          <Input text="Senha:" {...register("password")} type="password" />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>
        <div className="flex gap-5">
          <OrangeButton text="Voltar" onClick={onClick} />
          <OrangeButton text="Criar Conta" type="submit" />
        </div>
        {isError && <span className="text-red-600">Erro ao registrar: {error?.message}</span>}
        {isPending && <span className="text-green-400">Carregando...</span>}
      </div>
    </form>
  );
}
