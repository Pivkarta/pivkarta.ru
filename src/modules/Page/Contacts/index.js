import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Page from "../layout";

import Paper from 'material-ui/Paper';

import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';

const styles = {
  textBlock: {
    maxWidth: 1000,
    "& p": {
      marginTop: 15,
      marginBottom: 15,
      fontSize: "1rem",
    },
  },
  title: {
    color: "#2196F3",
    fontSize: "1.5rem",
    marginBottom: 20,
  },
};

export class ContactsPage extends Page {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


  componentWillMount(){
 
    this.setPageMeta({
      title: "Контакты",
    });

  }

  render() {

    const {
      classes,
    } = this.props;

    const mail = <a 
      href={`mailto:sales@pivkarta.ru`}
    >
      sales@pivkarta.ru
    </a>

    return super.render(
      <div
        className={classes.textBlock}
      >

        <Typography
          variant="title"
          className={classes.title}
        >
          Контакты
        </Typography>

        <Typography>
          По всем вопросам пишите на почту: {mail}
          <br/>
          Если у вас есть пожелания или предложения - пишите, всё обсуждаемо. 
          <hr/>
        </Typography>

      

        {/* <Typography
          variant="title"
          className={classes.title}
        >
          Сотрудничество
        </Typography> */}

        {/* <Typography>
          Приглашаем к сотрудничеству бары, магазины и пивоварни. Если Вы представитель организации, то регистрируйтесь
  на сайте и добавляйте Ваше заведение. Для того, чтобы добавить в описание бара, магазина или пивоварни предлагаемый
  ассортимент, Вам необходимо оформить подходящий тарифный план.
        </Typography>

        <Typography
          variant="title"
          className={classes.title}
        >
          Для пабов и магазинов
        </Typography>

         <Grid
          container
          spacing={16}         
        >

          <Grid            
              xs={12}
              sm={12}  
              md={4}   
              style={{
                padding:10,
              }}
              className={123123}
            >
              <Typography
                style={{
                  padding:10,
                  height: '100%',
                  borderStyle: 'solid',
                  borderColor: '#ececec',
                  borderWidth: 1
                }}
              >
                 <b>Тариф СТАНДАРТ</b> позволяет добавить к карточке заведения до 10 позиций. Стоимость тарифа - 100 рублей в месяц.
              </Typography>
        </Grid>

        <Grid            
              xs={12}
              sm={12}  
              md={4}  
              style={{
                padding:10,
              }}             
            >        
              <Typography
                style={{
                  padding:10,
                  height: '100%',
                  borderStyle: 'solid',
                  borderColor: '#ececec',
                  borderWidth: 1
                }}
              >    
            <b>Тариф БИЗНЕС.</b> Здесь Вам предлагается возможность добавить к карточке заведения до 25 позиций + Ваша фирменная
            иконка на карте. Стоимость тарифа - 1000 рублей в месяц.          
            </Typography> 
        </Grid>

        <Grid            
              xs={12}
              sm={12}  
              md={4} 
              style={{
                padding:10,
              }}             
            >            
              <Typography
                style={{
                  padding:10,
                  height: '100%',
                  borderStyle: 'solid',
                  borderColor: '#ececec',
                  borderWidth: 1
                }}
              >
            <b> Тариф МАКСИМУМ.</b> До 100 позиций + Ваша фирменная иконка на карте + информационный баннер Вашего заведения на карте.
            Баннер показывается посетителю сайта в том случае, если Ваше заведение находится в радиусе 1 км от центра
            карты на экране пользователя. Стоимость тарифа - 5000 рублей в месяц.          
            </Typography>
        </Grid>

       </Grid>

        <Typography
          style={{
            fontSize:20,
            color: '#ff9d19'
          }}
        >
          Количество заведений для тарифа НЕ ОГРАНИЧЕНО.<br/>То есть 10 точек по 10 позиций равно 1 заведению со 100 позициями.
        </Typography>
         

        <Typography>
          Если 100 позиций Вам мало, то пишите на почту {mail} Ваши
          пожелания и предложения, все обсуждаемо.
        </Typography>
       
        <Typography>
          Для того, чтобы воспользоваться тарифом, необходимо подтвердить, что Вы являетесь представителем заведения.
          Самый простой вариант это сделать - прислать письмо с корпоративной почты на ящик {mail}.
          Если такой возможности нет, напишите об этом на почту {mail}, что-нибудь придумаем.
        </Typography>

        <hr/>

         <Typography
          variant="title"
          className={classes.title}
          >
            Для пивоварен и оптовиков
          </Typography>

          <Typography>
            Ваша продукция предлагается в точках, которых нет в нашей системе? Добавим и точки, и вашу продукцию. Все изменения будут вноситься
            нашим менеджером по вашим письмам. Неограниченное количество точек, до 1000 позиций - 25000 рублей в месяц. Условия гибкие, все обсуждается - {mail}.
          </Typography>

          <hr/> */}
          
          <Typography
          variant="title"
          className={classes.title}
          >
            О сайте
          </Typography>
          
          <Typography>
            Сайт не является рекламной площадкой и ни в коей мере не пропогандирует употребление алкоголя в любом виде и количестве. 
            Сайт - информационный каталог тематических заведений. Размещая информацию о вашем заведении обязательно следуйте статьям и уложениям
            № 38-ФЗ «О рекламе» (от 13.03.2006 г.)
          </Typography>

          <Typography
          style={{
            fontSize:20,
            color: '#ff9d19'
          }}
        >
          Любая реклама алкогольной продукции категорически запрещена. 
        </Typography>

      </div>
    )
  }
}

export default withStyles(styles)(ContactsPage);