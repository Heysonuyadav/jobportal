import java.util.Scanner;

public class practice4 {
    public static void main(String[] args) {
        Scanner ft = new Scanner(System.in);
        System.out.println("enter year: ");

        int year = ft.nextInt();

        boolean x = (year % 4) == 0;
        boolean y = (year % 100) != 0;
        boolean z = ((year % 100 == 0) && (year % 400 == 0));

        if (x && (y || z)) {
            System.out.println(year + " is leap year");
        } else {
            System.out.println(year + " is not leap year");
        }
    }
}
