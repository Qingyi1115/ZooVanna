import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/account");
  }

  return (
    <Button
      onClick={handleLogout}
      variant={"outline"}
      className="mb-6 mt-4 w-full rounded-xl border-danger text-danger shadow-md hover:bg-danger/50"
    >
      Log out
    </Button>
  );
}

export default LogoutButton;
