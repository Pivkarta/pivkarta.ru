import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Page from "../layout";

import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui';
import { Typography } from 'material-ui';

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
          Сотрудничество
        </Typography>

        <Typography>
          Приглашаем к сотрудничеству бары, магазины и пивоварни. Если Вы представитель организации, то регистрируйтесь
  на сайте и добавляйте Ваше заведение. Для того, чтобы добавить в описание бара, магазина или пивоварни предлагаемый
  ассортимент, Вам необходимо оформить подходящий тарифный план.
        </Typography>

        <Typography>
          Тариф СТАНДАРТ позволяет добавить к карточке заведения до 10 позиций. Стоимость тарифа - 100 рублей в месяц.
        </Typography>

        <Typography>
          Тариф БИЗНЕС. Здесь Вам предлагается возможность добавить к карточке заведения до 25 позиций + Ваша фирменная
          иконка на карте. Стоимость тарифа - 1000 рублей в месяц.
        </Typography>

        <Typography>
          Тариф МАКСИМУМ. До 100 позиций + Ваша фирменная иконка на карте + рекламный баннер Вашего заведения на карте.
          Баннер показывается посетителю сайта в том случае, если Ваше заведение находится в радиусе 1 км от центра
          карты на экране пользователя. Стоимость тарифа - 5000 рублей в месяц.
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

      </div>
    )
  }
}

export default withStyles(styles)(ContactsPage);