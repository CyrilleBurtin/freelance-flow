const checkFormData = async (formData: FormData) => {
  const formDataObj = Object.fromEntries(formData.entries());
  console.log('FormData content:', formDataObj);
};

export default checkFormData;
