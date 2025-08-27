import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetch";
import SubmitUrl from "../../components/SubmitUrl/SubmitUrl";
import { RecipeParsed } from "../../types/types";
import ImageScroller from "../../components/ImageScroller/ImageScroller";

const AddRecipe = () => {
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [recipeParsedData, setRecipeParsedData] = useState<RecipeParsed>();
  useEffect(() => {
    if (submittedUrl !== "") parseRecipe();
  }, [submittedUrl]);

  const parseRecipe = async () => {
    console.log("HERE");
    const parsedData = await fetchData<RecipeParsed>(
      "../v1/recipes/parse-url",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: {
          url: submittedUrl,
        },
      }
    );
    setRecipeParsedData(parsedData);
  };
  return (
    <div className="container mx-auto">
      <SubmitUrl setSubmittedUrl={setSubmittedUrl} />
      {submittedUrl !== "" && recipeParsedData !== undefined && (
        <ImageScroller images={recipeParsedData.images} />
      )}
    </div>
  );
};
export default AddRecipe;
