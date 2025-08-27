import { useRef } from "react";
const SubmitUrl = ({ setSubmittedUrl }) => {
  const isSafeUrl = (url: string) => {
    return /[^\s/$.?#].[^\s]*$/.test(url);
  };
  const urlRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlRef.current && isSafeUrl(urlRef.current.value)) {
      setSubmittedUrl(urlRef.current.value);
    }
  };
  return (
    <div className="mt-8">
      <p className="text-lightg mx-auto w-1/4">
        Submit your url here, and we'll extract the data we need! Then you can
        view the info and submit for your approval.
      </p>
      <form
        className="flex flex-col max-w-[20rem] mx-auto justify-content-center mt-6"
        onSubmit={handleSubmit}
      >
        <input
          className="text-xl pl-2 py-1 rounded-md"
          ref={urlRef}
          type="text"
        />
        <button
          className="bg-lightg rounded-md mt-4 py-1 mx-auto w-1/2 hover:bg-medg"
          type="submit"
        >
          Get recipe data
        </button>
      </form>
    </div>
  );
};
export default SubmitUrl;
