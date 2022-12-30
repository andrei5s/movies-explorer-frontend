import { useContext } from 'react'
import CurrentUserContext from '../context/currentUserContext'
import useFormValidation from '../hooks/useFormValidator'
import Navigation from './Navigation';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors } = useFormValidation(props.handleEditProfile);
  
  return (
    <>
    <Navigation />
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" id="edit">
        
          <label className="form__indicator">Имя</label>
          <input className="form__input" value={values?.name} type="name" name="name" placeholder="Имя" minLength="2" required />        
        {errors?.name && <span className="error form__input-error">{errors.name}</span>}
        <div className="form__line"></div>
          <label className="form__indicator">E-mail</label>
          <input className="form__input" value={values?.email} type="email" name="email" placeholder="E-mail" required />        
        {errors?.email && <span className="profile__input-error">{errors.email}</span>}
        <div className="form__line"></div>      
          <>
            <button className="profile__edit" onClick={props.onEditProfile} type="submit">Редактировать</button>
            <button className="profile__exit" onClick={props.handleSignOut} type="submit">Выйти из аккаунта</button>
          </>            
      </form>
    </section>
    </>
  )
}

export default Profile