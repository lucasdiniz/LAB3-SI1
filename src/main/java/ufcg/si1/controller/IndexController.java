package ufcg.si1.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by lucasdiniz on 17/01/17.
 */
@Controller
@EnableAutoConfiguration
@ComponentScan
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView getIndex(){
        ModelAndView mainPage = new ModelAndView();
        mainPage.setViewName("index");
        return mainPage;
    }
}
