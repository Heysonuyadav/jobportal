import java.util.Scanner;

public class practice3 {

    public static void main(String[] args) {
        Scanner ft = new Scanner(System.in);

        float pencile = ft.nextFloat();
        float pen = ft.nextFloat();
        float eraser = ft.nextFloat();

        float totalcoast = pencile + pen + eraser;

        System.out.println("TotalCost Of Items: " + totalcoast);

        float newTotalCoast = totalcoast + (0.18f * totalcoast);
        System.out.println("total cost with gst: " + newTotalCoast);
    }
}