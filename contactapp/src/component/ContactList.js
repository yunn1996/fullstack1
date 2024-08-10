import React from "react";
import Contact from "./Contact";

const ContactList = ({data, currentPage, getAllContacts}) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact first.</div>}
            <ul className='contact__list'>
                {/*con 是content中的一个元素，如果con存在 就将它渲染到Contact组件中，见Contact.js*/}
                {data?.content?.length > 0 && data.content.map(con => <Contact contact={con} key={con.id}/>)}
            </ul>
            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <a onClick={() => getAllContacts(currentPage - 1)}
                       className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>
                    {data && [...Array(data.totalPages).keys()].map((page, index) =>
                        <a onClick={() => getAllContacts(page)} className={page === currentPage ? 'active' : ''}
                           key={page}>{page + 1}</a>
                    )}
                    <a onClick={() => getAllContacts(currentPage + 1)}
                       className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&laquo;</a>
                </div>
            }
        </main>
    )
}

export default ContactList
