package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;

import java.io.IOException;

@Aspect
@Order(2)
public class ValidationAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   */

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.tweet(..))")
  public void dummyBeforeAdvice(JoinPoint joinPoint) throws IllegalArgumentException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() > 140)
        throw new IllegalArgumentException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.follow(..)) || execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.block(..))")
  public void beforeFollow(JoinPoint joinPoint) throws IllegalArgumentException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() > 140)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[0].toString().equals(joinPoint.getArgs()[1].toString()))
        throw new UnsupportedOperationException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.follow(..)))")
  public void beforeUnBlock(JoinPoint joinPoint) throws IllegalArgumentException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() > 140)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[0].toString().equals(joinPoint.getArgs()[1].toString()))
        throw new UnsupportedOperationException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

}
