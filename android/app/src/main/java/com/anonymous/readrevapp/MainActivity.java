public class MainActivity {
    import org.devio.rn.splashscreen.SplashScreen; 
    @Override
protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // Show splash screen on app launch
    super.onCreate(savedInstanceState);
}
}
