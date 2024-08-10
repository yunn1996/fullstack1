import {useEffect, useRef, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {getContactsByPageQuery, saveContact, updatePhoto} from "./api/ContactService";
import Header from "./component/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactList from "./component/ContactList";
import ContactDetail from "./component/ContactDetail";
import {ToastContainer} from "react-toastify";
import {toastSuccess} from "./api/ToasService";

function App() {
    const modalRef = useRef();
    const fileRef = useRef();
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [file, setFile] = useState(undefined);
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
    });

    const getAllContacts = async (page = 0, size = 2) => {
        try {
            setCurrentPage(page);
            const {data} = await getContactsByPageQuery(page, size);
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const handleNewContact = async (event) => {
        event.preventDefault();
        try {
            const {data} = await saveContact(values);
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', data.id);
            await updatePhoto(formData);
            // clear form data and file ref
            toggleModel(false);
            setFile(undefined);
            fileRef.current.value = null;
            setValues({
                name: '',
                email: '',
                phone: '',
                address: '',
                title: '',
                status: '',
            });
            await getAllContacts();
            toastSuccess("Add new contact successfully!")
        } catch (error) {
            console.error(error);
        }
    }
    const updateContact = async (contact) => {
        return await saveContact(contact)
    };
    const updateImage = async (formData) => {
        return await updatePhoto(formData);
    };
    const toggleModel = show => show ? modalRef.current.showModal() : modalRef.current.close();
    useEffect(() => {
        getAllContacts().catch(Error)
    }, []);
    return (
        <>
            <Header toggleModel={toggleModel} nbOfContacts={data.totalElements}/>
            <main className='main'>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/contacts'}/>}/>
                        <Route path="/contacts" element={<ContactList data={data}
                                                                      currentPage={currentPage}
                                                                      getAllContacts={getAllContacts}/>}/>
                        <Route path='/contacts/:id'
                               element={<ContactDetail updateContact={updateContact} updateImage={updateImage}/>}/>
                    </Routes>
                </div>
            </main>

            {/*modal*/}
            <dialog ref={modalRef} className="modal" id="modal">
                <div className="modal__header">
                    <h3>New Contact</h3>
                    <i onClick={() => toggleModel(false)} className="bi bi-x-lg"></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewContact}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={values.name} onChange={onChange} name='name' required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={values.email} onChange={onChange} name='email' required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={values.title} onChange={onChange} name='title' required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" value={values.phone} onChange={onChange} name='phone' required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={values.address} onChange={onChange} name='address' required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" value={values.status} onChange={onChange} name='status' required/>
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef}
                                       name='photo' required/>
                            </div>
                        </div>
                        <div className="form_footer">
                            <button onClick={() => toggleModel(false)} type='button' className="btn btn-danger">Cancel
                            </button>
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
            <ToastContainer position={"top-right"}/>
        </>
    );
}

export default App;
