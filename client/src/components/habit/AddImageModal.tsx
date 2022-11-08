import Modal from '../shared/Modal';

interface AddImageModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddImageModal({ isOpen, setIsOpen }: AddImageModalProp) {
  const submitHandler = () => {
    console.log('submitted');
  };

  return (
    <Modal {...{ isOpen, setIsOpen }} title="Add Image">
      <div className="">
        <div>November 9, 2022</div>
        <div>
          <label htmlFor="imageUpload">
            {/* <PhotoIcon className="h-7 w-7 mx-auto cursor-pointer" /> */}
            upload an image
          </label>
          <input
            type="file"
            name="imageUpload"
            id="imageUpload"
            accept="image/*"
            className=""
          />
        </div>
        <button className="btn bg-green-300" onClick={submitHandler}>
          submit
        </button>
      </div>
    </Modal>
  );
}

export default AddImageModal;
