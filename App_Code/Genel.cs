using System;
using System.Collections.Generic;
using System.Web;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for Genel
/// </summary>
public class Genel
{

    public static bool EmailGecerliMi(string metin)
    {
        bool donenDeger = Regex.IsMatch(metin, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
        
        return donenDeger;
    }
 
 public static string BaslikDuzeni(string metin)
 {
    
    var sonuc= System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(metin.ToLower());
    return sonuc;
 }

 public static string IngilizceKarakterlereCevir(string metin)
 {
     var donusString=metin.ToLower();
     donusString=donusString.Replace("ö","o");
     donusString=donusString.Replace("ç","c");
     donusString=donusString.Replace("ş","s");
     donusString=donusString.Replace("ı","i");
     donusString=donusString.Replace("ğ","g");
     donusString=donusString.Replace("ü","u");
     donusString=donusString.Replace(" ","_");
    return donusString;
 }

public static string DateLabel(DateTime date,string dil)
    {
        var donenDeger="";
        TimeSpan timeSince = DateTime.Now.Subtract(date);
        if (dil=="tr") {
                if (timeSince.TotalMilliseconds < 1)
                    donenDeger = " Şimdi";
                else if (timeSince.TotalMinutes < 1)
                    donenDeger= "Az Önce";
                else if (timeSince.TotalMinutes < 2)
                    donenDeger=  "1 Dakika Önce";
                else if (timeSince.TotalMinutes < 60)
                    donenDeger=  string.Format("{0} Dakika Önce", timeSince.Minutes);
                else if (timeSince.TotalMinutes < 120)
                    donenDeger=  "1 Saat Önce";
                else if (timeSince.TotalHours < 24)
                    donenDeger=  string.Format("{0} Saat Önce", timeSince.Hours);
                else if (timeSince.TotalDays == 1)
                    donenDeger=  "Dün";
                else if (timeSince.TotalDays < 7)
                    donenDeger=  string.Format("{0} Gün Önce", timeSince.Days);
                else if (timeSince.TotalDays < 14)
                    donenDeger=  "1 Hafta Önce";
                else if (timeSince.TotalDays < 21)
                    donenDeger=  "2 Hafta Önce";
                else if (timeSince.TotalDays < 28)
                    donenDeger=  "3 Hafta Önce";
                else if (timeSince.TotalDays < 60)
                    donenDeger=  "1 Ay Önce";
                else if (timeSince.TotalDays < 365)
                    donenDeger=  string.Format("{0} Ay Önce", Math.Round(timeSince.TotalDays / 30));
                else if (timeSince.TotalDays < 730)
                    donenDeger=  "1 Yıl Önce";
                 else if (timeSince.TotalDays>=730)
                     donenDeger=  string.Format("{0} Yıl Önce", Math.Round(timeSince.TotalDays / 365));
        }
        else if (dil=="en")
        {
                 if (timeSince.TotalMilliseconds < 1)
                    donenDeger=  " Just Now";
                else if (timeSince.TotalMinutes < 1)
                    donenDeger=  "Just Now";
                else if (timeSince.TotalMinutes < 2)
                    donenDeger=  "1 minute ago";
                else if (timeSince.TotalMinutes < 60)
                    donenDeger=  string.Format("{0} minutes ago", timeSince.Minutes);
                else if (timeSince.TotalMinutes < 120)
                    donenDeger=  "1 hour ago";
                else if (timeSince.TotalHours < 24)
                    donenDeger=  string.Format("{0} hours ago", timeSince.Hours);
                else if (timeSince.TotalDays == 1)
                    donenDeger=  "Yesterday";
                else if (timeSince.TotalDays < 7)
                    donenDeger=  string.Format("{0} days ago", timeSince.Days);
                else if (timeSince.TotalDays < 14)
                    donenDeger=  "1 week ago";
                else if (timeSince.TotalDays < 21)
                    donenDeger=  "2 weeks ago";
                else if (timeSince.TotalDays < 28)
                    donenDeger=  "3 weeks ago";
                else if (timeSince.TotalDays < 60)
                    donenDeger=  "1 month ago";
                else if (timeSince.TotalDays < 365)
                    donenDeger=  string.Format("{0} months ago", Math.Round(timeSince.TotalDays / 30));
                else if (timeSince.TotalDays < 730)
                    donenDeger=  "1 year ago";
                else if (timeSince.TotalDays>=730)
                    donenDeger=  string.Format("{0} years ago", Math.Round(timeSince.TotalDays / 365));   
        }
        return donenDeger;

    }

    public static string StorageLabel(double boyut)
    {
        string[] sizes = { "B", "KB", "MB", "GB" };
        double len = boyut;
        int order = 0;
        while (len >= 1024 && order + 1 < sizes.Length) {
            order++;
            len = len/1024;
        }
        string result = String.Format("{0:0.##} {1}", len, sizes[order]);
        return result;
    }

public static string BildirimEylemindenMetne(int EylemID,string dil)
    {
       var returnString="";
       
       if (dil=="tr")
       {
           if (EylemID==1)
           {
               returnString=" bir aktiviteyi beğendi";
           }
           else if (EylemID==2)
           {
               returnString=" derse bir dosya ekledi";
           }
           else if (EylemID==3)
           {
               returnString=" dersini takip etmeye başladı";
           }
           else if (EylemID==4)
           {
               returnString=" bir içerik paylaştı";
           }
          
           else if (EylemID==5)
           {
               returnString=" dersi için takip isteği gönderdi";
           }
          else if (EylemID==6)
           {
               returnString=" dersini takip etmeyi bıraktı";
           }
           else if (EylemID==7)
               {
                   returnString=" dosyasını size paylaşıma açtı";
               }
          else if (EylemID==8)
               {
                   returnString=" mesajlaşma kanalında size erişim izni verdi";
               }
          else if (EylemID==9)
               {
                   returnString=" gönderilen ödevi inceledi";
               }
          else if (EylemID==10)
               {
                   returnString=" ödevini gönderdi";
               }
          else if (EylemID==11)
               {
                   returnString=" yeni bir ödev verdi";
               }


           }
       
           else if (dil=="en")
           {
           if (EylemID==1)
           {
               returnString=" like an activity";
           }
           else if (EylemID==2)
           {
               returnString=" add a file to course:";
           }
           else if (EylemID==3)
           {
               returnString=" is following course: ";
           }
           else if (EylemID==4)
           {
               returnString=" share a text in the course page";
           }
          
           else if (EylemID==5)
           {
               returnString=" send following request for the course:";
           }
          else if (EylemID==6)
           {
               returnString=" unfollow the course:";
           }
           else if (EylemID==7)
               {
                   returnString=" shared a file you";
               }
          else if (EylemID==8)
               {
                   returnString=" added you in a messaging channel";
               }
          else if (EylemID==9)
               {
                   returnString=" evaluated your assignment";
               }
          else if (EylemID==10)
               {
                   returnString=" sent your assigment";
               }
          else if (EylemID==11)
               {
                   returnString=" gave an assigment in";
               }

       }
       return returnString;
    }

public static string AktiviteEylemindenMetne(int EylemID,string dil)
    {
       var returnString="";
       
       if (dil=="tr")
       {
           if (EylemID==1)
           {
               returnString=" bir dosya paylaştı";
           }
           else if (EylemID==2)
           {
               returnString=" bir içerik paylaştı";
           }
           else if (EylemID==3)
           {
               returnString=" bir ödev verdi";
           }
       }
       
       else if (dil=="en")
       {
          if (EylemID==1)
           {
               returnString=" added a file";
           }
           else if (EylemID==2)
           {
               returnString=" shared a text in the course page";
           }
           else if (EylemID==3)
           {
               returnString=" gave an assignment";
           }  
       }
       return returnString;
    }


}

public class Aktivite
{
    public long AktiviteID;
    public long UserID;
    public long DersID;
    public DateTime Tarih;
    public string URL;
    public string Renk;
    public string Ikon;
    public string Metin;
    public int Silindi;
    public string IlaveURL;
    public string IlaveMetin;
    public string IlaveFoto;
    public int EylemID;
    public long UI_BegeniSayisi;
    public long UI_SilmeDugmesi;
    public string UI_DersAdi;
    public string UI_KisiAvatar;
    public string UI_KisiUnvan; 
    public string UI_KisiAd; 
    public string UI_KisiSoyad;
    public int UI_KisiOnayli;
    public string UI_GorunenTarih;
    public int UI_AktiviteBegendi;
    public int UI_AktiviteOkundu;
   
 

}



public class Bildirim
{
    public long BildirimID;
    public DateTime Tarih;
    public int EylemiYapanUserID;
    public int EylemID;
    public int DersID;
    public string Url;
    public string DersAdi;
    public string Avatar;
    public string Ad;
    public string Soyad;

}


public static class HTMLParser
{
    public static string Link(this string s, string url)
    {
        return string.Format("<a href=\"{0}\" target=\"_blank\">{1}</a>", url, s);
    }
    public static string ParseURL(this string s)
    {
        return Regex.Replace(s, @"(www.+|http.+)([\s]|$)", new MatchEvaluator(HTMLParser.URL));
    }
    public static string ParseUsername(this string s)
    {
        return Regex.Replace(s, "(@)((?:[A-Za-z0-9-_]*))", new MatchEvaluator(HTMLParser.Username));
    }
    public static string ParseHashtag(this string s)
    {
        return Regex.Replace(s, "(#)((?:[A-Za-z0-9-_]*))", new MatchEvaluator(HTMLParser.Hashtag));
    }
    private static string Hashtag(Match m)
    {
        string x = m.ToString();
        string tag = x.Replace("#", "%23");
        return x.Link("http://search.twitter.com/search?q=" + tag);
    }
    private static string Username(Match m)
    {
        string x = m.ToString();
        string username = x.Replace("@", "");
        return x.Link("http://twitter.com/" + username);
    }
    private static string URL(Match m)
    {
        string x = m.ToString();
        return x.Link(x);
    }


}
