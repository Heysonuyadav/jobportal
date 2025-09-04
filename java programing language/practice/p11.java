package practice;



 class  car {

    
 String model;
    int year;

    car(String model,int year){
        this.model = model;
        this.year = year;
    }
 }
public class p11 {

   public static void main(String[] args) {
    
   car  myCar = new car("hero",2025);

   System.out.println("model- "+myCar.model+" , year- " +myCar.year);
   }

    
}
