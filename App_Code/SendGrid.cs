using System;
using System.Collections.Generic;
using System.Web;
using System.Net;
using System.Net.Mail;
using SendGrid;
using System.Configuration;

/// <summary>
/// Summary description for SendGrid
/// </summary>
public static class SendGridServisi
{
   public static void TopluMailGonder(List<string> Alicilar,string Konu,string Html)
   {           
    SendGridMessage mesaj = new SendGridMessage();
    var bulutDersMail=System.Configuration.ConfigurationManager.AppSettings["BulutDersMail"];
    mesaj.AddTo(string.Format("Undisclosed Recipients <{0}>",bulutDersMail));
    
    foreach (var alici in Alicilar)
    {
        mesaj.AddBcc(alici);    
    }
    
    mesaj.From = new MailAddress(bulutDersMail, "BulutDers");
    mesaj.Subject = Konu;
    mesaj.Html=Html;
    var transportWeb = new Web(System.Configuration.ConfigurationManager.AppSettings["SendGridApiKey"]);
    transportWeb.DeliverAsync(mesaj);
    
  }

  
}
